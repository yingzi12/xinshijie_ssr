import { useQuasar } from 'quasar';

export function imageUrl(imgUrl) {
  const $q = useQuasar();
  return `${$q.config.sourceWeb}${imgUrl}`;
}
