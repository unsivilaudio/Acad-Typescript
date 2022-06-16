import { DragTarget } from '../models/drag-drop.js';
import { Project, ProjectStatus } from '../models/project.js';
import { Component } from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project.js';
import { ProjectItem } from './project-item.js';

// ProjectList class
export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer?.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul') as HTMLUListElement;
            listEl.classList.add('droppable');
        }
    }

    @autobind
    dragLeaveHandler(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const listEl = this.element.querySelector('ul') as HTMLUListElement;
        listEl.classList.remove('droppable');
    }

    @autobind
    dropHandler(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            prjId,
            this.type === 'active'
                ? ProjectStatus.Active
                : ProjectStatus.Finished
        );
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            const relevevantProj = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevevantProj;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listId = `${this.type}-projects-list`;
        const listEl = document.getElementById(listId);
        listEl!.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(listId, prjItem);
        }
    }
}
