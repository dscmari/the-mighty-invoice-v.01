export type Customer = {
  id:number,
  name: string,
  street: string,
  plz: string,
  mail: string,
  tel: string,
}

export type Lesson = {
    id: number,
    studentId: number,
    date: Date,
    description: string
}

export type Invoice = {
  id : number;
  invoiceNumber: string,
  customerId: number,
  createdAt: Date, 
}   
    
export type CreateInvoice = Omit<Invoice, 'id'>