import { Usuario } from './Usuario';
import { Produto } from './Produto';

export class Movimento {
  id: number;
  data: Date;
  produto: Produto;
  tipo: string;
  motivo: string;
  quantidade: number;
  observacao: string;
  usuario: Usuario;

}
