import { Common } from 'src/entities/Common';

export function projects() {
  return new Projects();
}

export class Projects extends Common {
  constructor() {
    super('projects');
  }

  async current() {

    return await this.query('SELECT pr.id, pr.summary FROM settings se, projects pr WHERE se.key = \'currentBook\' AND se.data = pr.id');
  }

  async getChapters(projectId: number) {
    return await this.query(`SELECT ch.id, ch.summary
                             FROM chapters ch,
                                  books bo,
                                  projects pr
                             WHERE ch.parentId = bo.id
                               AND bo.projectId = pr.id
                               AND pr.id = ${projectId}`, false);
  }

  async getBooks(projectId: number) {
    return await this.query(`SELECT bo.id, bo.summary
                             FROM books bo,
                                  projects pr
                             WHERE bo.projectId = pr.id
                               AND pr.id = ${projectId}`, false);
  }

  async getScenes(projectId: number) {
    return await this.query(`SELECT sc.id, sc.summary
                             FROM SCENES sc,
                                  chapters ch,
                                  books bo,
                                  projects pr
                             WHERE sc.parentId = ch.id
                               AND ch.parentId = bo.id
                               AND bo.projectId = pr.id
                               AND pr.id = ${projectId}`, false);
  }
}
