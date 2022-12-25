import { MultipleTags } from '../../types/tag';
import { httpClient } from 'config';

export async function getTags(): Promise<MultipleTags> {
  return httpClient.get('tags');
}
