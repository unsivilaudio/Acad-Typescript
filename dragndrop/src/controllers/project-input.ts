import { autobind } from '@/decorators/autobind';
import InputValidator from '@/util/input-validator';
import ProjectState from '@/controllers/project-state';
import Component from '@/models/component';

const projectState = new ProjectState();

interface IProjectFormData {
  title: string;
  description: string;
  people: string;
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const fd = new FormData(this.element);
    /** NASTY WORKAROUND FOR THIS */
    const formData = Object.fromEntries(fd) as unknown as IProjectFormData;

    const titleIsValid = InputValidator.validate(formData.title, {
      required: true,
      minLength: 5,
    });
    const descriptionIsValid = InputValidator.validate(formData.description, {
      required: true,
      minLength: 5,
    });
    const peopleIsValid = InputValidator.validate(+formData.people, {
      required: true,
      min: 1,
      max: 5,
    });

    if (!titleIsValid || !descriptionIsValid || !peopleIsValid) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [formData.title, formData.description, +formData.people];
    }
  }

  private clearInputs() {
    this.element.reset();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}

export default ProjectInput;
