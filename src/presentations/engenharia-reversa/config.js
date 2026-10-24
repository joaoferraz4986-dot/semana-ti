// Configuração da apresentação "Engenharia reversa".
import { criarMaquina } from './cenas/maquina/index.js';

export default {
  titulo: 'Engenharia reversa · Semana de TI',
  // cor de destaque (laranja sinal). Mude aqui para trocar em toda a apresentação.
  acento: '#e4572e',
  climaPadrao: 'estudio',
  cenaPadrao: 'maquina',

  // Capítulos: todos os .md da pasta conteudo/, em ordem alfabética do nome do arquivo.
  conteudo: import.meta.glob('./conteudo/*.md', { query: '?raw', import: 'default', eager: true }),

  // Cenas 3D disponíveis (o nome é o que vai em "cena:" no .md)
  cenas: {
    maquina: criarMaquina,
  },
};
