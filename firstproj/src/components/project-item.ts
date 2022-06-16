/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    // Project Item
    export class ProjectItem
        extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggable
    {
        private project: Project;

        get persons() {
            return this.project.people === 1
                ? '1 person'
                : this.project.people + ' persons';
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project;

            this.configure();
            this.renderContent();
        }

        @autobind
        dragStart(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }

        @autobind
        dragEnd(event: DragEvent) {
            event.preventDefault();
            console.log(event);
        }

        configure(): void {
            this.element.addEventListener('dragstart', this.dragStart);
            this.element.addEventListener('dragend', this.dragEnd);
        }

        renderContent(): void {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent =
                this.persons + ' assigned';
            this.element.querySelector('p')!.textContent =
                this.project.description;
        }
    }
}
