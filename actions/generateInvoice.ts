"use server";
import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";
import { parseDate, incrementInvoiceNumber } from "@/utils/generate-pdf";
import type { Invoice } from "@/utils/types";
import type { CreateInvoice } from "@/utils/types";

export const generateInvoice = async (formData: FormData) => {

  //customer
  const customerIdString = formData.get("customerId");
  const customerId = parseInt(customerIdString!.toString());
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });
  const customerName = customer?.name;
  const customerStreet = customer?.street;
  const customerPLZ = customer?.plz;

  //lessons
  const lessonIdsString = formData.getAll("lessonIds"); //returns [] when no lessonIds exist in form
  const lessonIds = lessonIdsString.map((e) => parseInt(e!.toString()));
  const lessons = await prisma.lesson.findMany({
    where: {
      id: {
        in: lessonIds,
      },
    },
  });

  //type of invoice
  const isStudentLesson = lessons.length > 0

  //namasteItems
  const descriptions = formData.getAll("description");
  const rows = Array.from({ length: descriptions.length });
  const datesAsStrings = formData.getAll("date");
  const dates: Date[] = datesAsStrings
    .filter((value): value is string => typeof value === "string") // Filters out File objects, leaving only strings
    .map((dateString: string) => {
      // Now dateString is guaranteed to be a string
      return new Date(dateString);
    });
  const quantities = formData
    .getAll("quantity")
    .filter((value): value is string => typeof value === "string")
    .map((quantitiy) => {
      return parseInt(quantitiy);
    });
  const prices = formData
    .getAll("price")
    .filter((value): value is string => typeof value === "string")
    .map((price) => {
      return parseFloat(price);
    });

  const rowTotals = quantities.map((quantity, index) => {
    const price = prices[index]; // Get corresponding price

    // Ensure both are valid numbers before multiplication
    if (!isNaN(quantity) && !isNaN(price)) {
      return quantity * price;
    }
    return 0; // Return 0 if either is not a valid number
  });

  const totalPriceNamasteInvoice = rowTotals.reduce((sum, currentTotal) => sum + currentTotal, 0);

  //invoice
  const latestInvoice = await prisma.invoice.findFirst({
    orderBy: {
      id: "desc"
    }
  });

  const currentYear = new Date().getFullYear();
  const getInvoiceNumber = (latestInvoice: Invoice) => {
    if (latestInvoice?.createdAt.getFullYear() === currentYear) {
      return incrementInvoiceNumber(latestInvoice.invoiceNumber);
    } else {
      return "01_" + currentYear;
    }
  };

  let invoiceNumber;
  if (latestInvoice) {
    invoiceNumber = getInvoiceNumber(latestInvoice);
  } else {
    invoiceNumber = "01_" + currentYear; //no database entries yet
  }

  const newInvoice: CreateInvoice = {
    invoiceNumber: invoiceNumber,
    customerId: customerId,
    createdAt: new Date()
  };

  await prisma.invoice.create({
    data: newInvoice
  });

  //date
  const newDate = new Date();
  const date = parseDate(newDate);

  //constants
  const totalLessons = 1;
  const price = 40;
  const totalPriceStudentLessons = lessons.length * price;
  const marianInfo =
    "Marian Nökel | Webendwicklung | Steuernummer: 146/110/71311";
  const namasteInfo =
    "Tel.:  015231432433 | Mail: noekel@namaste-websites.de | www.namaste-websites.de";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const content = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rechnung</title>
        <style>
            body {
                font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
                margin: 0;
                padding: 2cm;
                line-height: 1.4;
                color: #333;
                background-color: #f9f9f9;
                font-size: 10pt;
            }

            .container {
                max-width: 21cm; /* A4 width */
                margin: 0 auto;
                background-color: #fff;
                padding: 0 2cm 0 2cm;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            }

            .company-info {
               display: flex;
               align-items: flex-start;
               font-weight: 300;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
            }

            .header h1 {
                color: #333;
                font-size: 16pt;
                margin: 0;
                margin-bottom: 1rem;
                line-height: 0.8;
            }

            ul {
                list-style: none;
                margin-left: 0;
                padding-left: 0;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                margin-bottom: 30px;
            }

            th, td {
                border: 1px solid #ddd;
                padding: 10px;
                font-size: 9pt;
            }

            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }

            .text-right {
                text-align: right;
            }

            .totals-table {
                width: 40%; /* Adjust as needed */
                margin-left: auto; /* Aligns to the right */
                border-collapse: collapse;
                margin-top: 20px;
            }

            .regards {
                margin-top: 1rem;
                margin-bottom:0.5rem;
            }
        </style>
    </head>
    <body>
     
        <div class="container">
          <p class="company-info" style="margin-bottom: 0;">${marianInfo}</p>
          <p class="company-info" style="margin-bottom: 2rem; margin-top: 0;">${namasteInfo}</p>
            <div class="header">
                <div>
                    <h1>Rechnung</h1>
                    <ul>
                        <li>${customerName}</li>
                        <li>${customerStreet}</li>
                        <li>${customerPLZ}</li>
                    </ul>
                </div>
            </div>
            <div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th class="text-right">Pos.</th>
                        <th class="text-right">Beschreibung</th>
                        <th class="text-right">Datum</th>
                        <th class="text-right">Menge</th>
                        <th class="text-right">Preis</th>
                        <th class="text-right">Gesamt</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                      isStudentLesson
                        ? lessons
                            .map((lesson, index) => {
                              return `
                            <tr>
                                <td class="text-right">${index + 1}</td>
                                <td class="text-right">${lesson.description? lesson.description : "Programmierkurs"}</td>
                                <td class="text-right">${parseDate(
                                  lesson.date
                                )}</td>
                                <td class="text-right">${totalLessons}</td>
                                <td class="text-right">${price}€</td>
                                <td class="text-right">${
                                  totalLessons * price
                                }€</td>
                            </tr>`
                            })
                            .join("")
                        : rows.map((row, index) => {
                            return `
                            <tr>
                                <td class="text-right">${
                                  index + 1
                                }</td>
                                <td class="text-right">${
                                  descriptions[index]
                                }</td>
                                <td class="text-right">${parseDate(
                                  dates[index]
                                )}</td>
                                <td class="text-right">${
                                  quantities[index]
                                }</td>
                                <td class="text-right">${
                                  prices[index]
                                }€</td>
                                <td class="text-right">${
                                  quantities[index] * prices[index]
                                }€</td>
                            </tr>`
                          })
                          .join("")
                    }
                </tbody>
            </table>

            <table class="totals-table">
                <tr class="subtotal">
                    <th class="text-right">Netto Gesamt:</th>
                    <td class="text-right"> ${isStudentLesson ? totalPriceStudentLessons : totalPriceNamasteInvoice}€</td>
                </tr>
       
            </table>
            <p>
                Ich bin Kleinunternehmer und somit nach §19 Abs. 1 UStG nicht mehrwertsteuerpflichtig, weshalb ich keinen USt-Ausweis habe. Bitte überweisen Sie den Betrag innerhalb von 14 Tagen auf folgendes Konto:
            </p>
            <ul style="line-height: 1.1; margin-top: 1.5rem; margin-bottom: 1.5rem;">
                <li>Marian Nökel</li>
                <li>N26 Bank AG</li>
                <li>IBAN: DE94 1001 1001 2587 6446 18</li>
                <li>BIC: NTSBDEB1XXX</li>
            </ul>
            <p class="regards">Mit freundlichen Grüßen</p>
            <p style="margin-bottom: 2rem;">Marian Nökel</p>
        </div>
    </body>
    </html>
  `;
  await page.setContent(content, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    path: `invoices/INV-${invoiceNumber}.pdf`,
  });

  await browser.close();
};
