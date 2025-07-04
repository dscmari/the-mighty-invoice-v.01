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
    date: Date
}