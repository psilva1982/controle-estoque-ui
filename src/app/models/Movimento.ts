import { Usuario } from './Usuario';
import { Produto } from './Produto';

export class Movimento {
  id: number;
  data: any;
  produto: string;
  tipo_movimento: string;
  motivo: string;
  quantidade: number;
  observacao: string;
  usuario: Usuario;
}
