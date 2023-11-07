
export default async function exist(value: number, model: any): Promise<boolean> {
  if('findByPk' in model) return await model.findByPk(value);
  return false;
}
