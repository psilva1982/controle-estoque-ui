import { Local } from './Local';
import { SubCategoria } from './SubCategoria';
import { Medida } from './Medida';

export class Produto {
    id: number;
    codigo: string;
    descricao: string;
    subcategoria: SubCategoria;
    medida: Medida;
    minimo: number;
    estoque: number;
    local: Local;
}
