  //helper functions
  export function parseDate(date : Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  export function incrementInvoiceNumber(s: string){
    const parts = s.split('_'); // Result: ["01", "2025"]
    const invoiceString = parts[0]; 
    const year = parts[1]; 
    const invoiceNumber = parseInt(invoiceString, 10)
    const newNumber = (invoiceNumber + 1);
    return String(newNumber).padStart(2, '0') + "_" + year
  } 