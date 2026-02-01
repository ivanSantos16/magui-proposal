import type { TimelineItemData } from '@/types';
import cinemaThumbnail from '@/assets/images/cinema_thumbnail.png';
import porDoSol from "@/assets/images/por_do_sol.jpeg"
import maguiCostas from "@/assets/images/magui_costas.png"
import ivanMagui from "@/assets/images/ivan_maguii.jpeg"

export const timelineData: TimelineItemData[] = [
  {
    id: 'cinema',
    type: 'photo',
    content: '',
    image: cinemaThumbnail,
    caption: 'Onde tudo começou...',
    date: 'Uma mãozinha que nunca me largou 😳'
  },
  {
    id: 'quote-1',
    type: 'quote',
    content: 'Cada momento contigo é uma memória que guardo',
    author: 'O teu pequenino 🐥'
  },
  {
    id: 'memory-1',
    type: 'memory',
    title: 'Primeira vez',
    content: 'A primeira vez que te vi, o meu sorriso falou por mim.',
    emoji: '💫'
  },
  {
    id: 'porDoSol',
    type: 'photo',
    content: '',
    image: porDoSol,
    caption: 'Onde conquistei os teus lábios 😳',
    date: 'O por do sol e os teus beijos passaram a ser o nosso maior vicio 💉'
  },
  {
    id: 'quote-2',
    type: 'quote',
    content: '"O amor não se vê com os olhos, mas com o coração"',
    author: 'William Shakespeare'
  },
  {
    id: 'maguiCostas',
    type: 'photo',
    image: maguiCostas,
    content: '',
    caption: 'A 🦦 no seu habitat natural',
    date: 'Potenciou todos os seus gestos marotos'
  },
  {
    id: 'memory-2',
    type: 'memory',
    title: 'Momentos inesquecíveis',
    content: 'Muito possivelmente, dentro da piscina será o sitio onde estás mais confortável e és capaz de produzir a tua melhor linguagem de amor.',
    emoji: '🐬'
  },
  {
    id: 'ivanMagui',
    type: 'photo',
    image: ivanMagui,
    content: '',
    caption: 'Mas foi a nadar que eu me rendi 😳',
    date: ''
  },
  {
    id: 'photo-3',
    type: 'photo',
    content: '🌹',
    caption: 'Para ti',
    date: 'Com todo o meu amor'
  },
  {
    id: 'quote-3',
    type: 'quote',
    content: '"Tu és a razão pela qual eu acredito no amor verdadeiro"',
    author: 'Do fundo do meu coração'
  },
  {
    id: 'memory-3',
    type: 'memory',
    title: 'O pedido',
    content: 'Chegou a hora de te perguntar algo muito importante...',
    emoji: '💕'
  }
];
