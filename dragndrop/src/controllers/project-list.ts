import Component from '@/models/component';
import Project, { ProjectStatus } from '@/models/project';
import ProjectState from '@/controllers/project-state';
import ProjectItem from '@/models/project-item';
import { autobind } from '@/decorators/autobind';

const projectState = new ProjectState();

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    super('project-list', 'app', false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const projId = event.dataTransfer?.getData('text/plain');
    if (projId) {
      projectState.moveProject(projId, this.type);
    }
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  private renderProject() {
    const listEl = <HTMLUListElement>(
      document.getElementById(
        `${this.type.toString().toLowerCase()}-projects-list`
      )
    );
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(
        (prj) => prj.status === this.type
      );
      this.assignedProjects = relevantProjects;
      this.renderProject();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toString().toUpperCase() + ' PROJECTS';
  }
}

export default ProjectList;
