export class Interpret {
  firstName?: string | null;
  id?: number;
  name?: string | null;
  birthDate?: string;
  gender?: string | null;
  fullName?: string | null = `${this.firstName} ${this.name}`;
}
