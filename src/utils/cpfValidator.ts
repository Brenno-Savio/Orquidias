import { mask, validate } from 'node-cpf';

export default function cpfValidator(cpf: string): string | boolean {
  if (!validate(cpf)) return false;
  return mask(cpf);
}
