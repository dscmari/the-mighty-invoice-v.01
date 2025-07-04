"use server";
import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";

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

  //lessons
  const lessonIdsString = formData.getAll("lessonIds");
  const lessonIds = lessonIdsString.map((e) => parseInt(e!.toString()));
  const lessons = await prisma.lesson.findMany({
    where: {
      id: {
        in: lessonIds,
      },
    },
  });

  const description = "Programmiereinheit 60 Min"
  const totalLessons = 1;
  const price = 40;
  const totalPrice = lessons.length * price 


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const content = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rechnung - </title>
        <style>
            body {
                font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
                margin: 0;
                padding: 2cm;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                font-size: 10pt;
            }

            .container {
                max-width: 21cm; /* A4 width */
                margin: 0 auto;
                background-color: #fff;
                padding: 2cm;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 40px;
            }

            .header h1 {
                color: #333;
                font-size: 24pt;
                margin: 0;
                line-height: 1;
            }

            .company-info {
                text-align: right;
                font-size: 9pt;
            }

            .company-info p {
                margin: 0;
            }

            .address-block {
                margin-bottom: 30px;
                padding: 15px;
                border: 1px solid #eee;
                background-color: #fcfcfc;
                border-radius: 4px;
            }

            .address-block p {
                margin: 0;
            }

            .invoice-details {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                font-size: 10pt;
            }

            .invoice-details div p {
                margin: 0;
            }

            .invoice-details .left-details {
                flex-grow: 1;
            }

            .invoice-details .right-details {
                text-align: right;
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
                text-align: left;
                font-size: 9pt;
            }

            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }

            .text-right {
                text-align: right;
            }

            .text-center {
                text-align: center;
            }

            .totals-table {
                width: 40%; /* Adjust as needed */
                margin-left: auto; /* Aligns to the right */
                border-collapse: collapse;
                margin-top: 20px;
            }

            .totals-table th, .totals-table td {
                border: none;
                padding: 5px 10px;
                text-align: right;
            }

            .totals-table tr.subtotal td,
            .totals-table tr.vat td {
                border-bottom: 1px solid #eee;
            }

            .totals-table tr.total th,
            .totals-table tr.total td {
                font-size: 11pt;
                font-weight: bold;
                border-top: 2px solid #333;
                padding-top: 10px;
            }

            .footer {
                margin-top: 50px;
                text-align: center;
                font-size: 8pt;
                color: #777;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }

            .bank-details p {
                margin: 5px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div>
                    <h1>Rechnung</h1>
                    ${customerName}
                </div>

            </div>



            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Beschreibung</th>
                        <th class="text-right">Menge</th>
                        <th class="text-right">Einzelpreis</th>
                        <th class="text-right">Gesamt</th>
                    </tr>
                </thead>
                <tbody>
                ${lessons.map((lesson) => {
                    return `
                    <tr>
                        <td>${lessons.indexOf(lesson) + 1}</td>
                        <td>${description}</td>
                        <td class="text-right">${totalLessons}</td>
                        <td class="text-right">${price}</td>
                        <td class="text-right">${totalLessons * price}</td>
                    </tr>`
                })}
   
                </tbody>
            </table>

            <table class="totals-table">
                <tr class="subtotal">
                    <th>Netto Gesamt:</th>
                    <td> ${totalPrice}€</td>
                </tr>
       
            </div>
        </div>
    </body>
    </html>
  `;
  await page.setContent(content, {
    waitUntil: "networkidle0",
  });
  // Saves the PDF to hn.pdf.
  await page.pdf({
    path: "invoices/rechnung.pdf",
  });

  await browser.close();
};
