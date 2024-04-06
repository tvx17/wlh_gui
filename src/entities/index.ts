import { Common } from './Common';
import { Books } from './Books';
import { Chapters } from './Chapters';
import { ChapterSections } from './ChapterSections';
import { Characters } from './Characters';


import { Forms } from './Forms';
import { Locations } from './Locations';
import { Objects } from './Objects';
import { Projects } from './Projects';
import { Settings } from './Settings';
import { Structure } from './Structure';
import { Scenes } from './Scenes';
import { Universes } from './Universes';
import { UniverseSections } from './UniverseSections';
import { Users } from './Users';

const _file = 'src/app/entities/index.ts';

export function common(tableName?: string) {
  return new Common(tableName);
}

export function books() {
  return new Books();
}

export function chapters() {
  return new Chapters();
}

export function chapterSections() {
  return new ChapterSections();
}

export function characters() {
  return new Characters();
}

export function forms() {
  return new Forms();
}

export function locations() {
  return new Locations();
}

export function objects() {
  return new Objects();
}

export function projects() {
  return new Projects();
}

export function structure() {
  return new Structure();
}

export function scenes() {
  return new Scenes();
}

export function universes() {
  return new Universes();
}

export function universeSections() {
  return new UniverseSections();
}

export function users() {
  return new Users();
}

export function settings() {
  return new Settings();
}

export function entity(tableName: string) {
  return new Common(tableName);
}
