import { Common } from 'src/entities/Common';

export function chapterSections() {
  return new ChapterSections();
}
export class ChapterSections extends Common {
  constructor() {
    super('chapter_sections');
  }
}
