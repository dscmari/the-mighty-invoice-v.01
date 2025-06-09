import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


// GET nur für client components notwendig
/*
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        id: 'asc', // Oder ein anderes Feld wie 'name' oder 'createdAt'
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
    return NextResponse.json({ message: 'Interner Serverfehler beim Abrufen der Kunden.' }, { status: 500 });
  }
}
*/

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, mail } = body;

    // Grundlegende Validierung der Eingabe
    if (!name || !address || !mail) {
      return NextResponse.json(
        { message: "Name und Adresse sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        address,
        mail
      },
    });

    // Erfolgreiche Erstellung, Status 201 (Created)
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Fehler beim Erstellen des Kunden:", error);
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return NextResponse.json(
        { message: "Ein Kunde mit dieser E-Mail existiert bereits." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Interner Serverfehler beim Erstellen des Kunden." },
      { status: 500 }
    );
  }
}
