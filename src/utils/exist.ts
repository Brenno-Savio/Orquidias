
export default function exist(value: number, model: any): boolean {
  if('findByPk' in model) return model.findByPk(value);
  return false;
}
