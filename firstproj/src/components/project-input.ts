/// <reference path="base-component.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
    // ProjectInput Class
    export class ProjectInput extends Component<
        HTMLDivElement,
        HTMLFormElement
    > {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', false, 'user-input');

            this.titleInputElement = this.element.querySelector(
                '#title'
            ) as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector(
                '#description'
            ) as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector(
                '#people'
            ) as HTMLInputElement;

            this.configure();
        }

        renderContent() {}

        configure() {
            this.element.addEventListener(
                'submit',
                this.submitHandler.bind(this)
            );
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = +this.peopleInputElement.value;

            if (
                !validate({ value: enteredTitle, required: true }) ||
                !validate({ value: enteredDescription, required: true }) ||
                !validate({
                    value: enteredPeople,
                    min: 1,
                    max: 10,
                    required: true,
                })
            ) {
                alert('Invalid input, please try again');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }

        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
    }
}
