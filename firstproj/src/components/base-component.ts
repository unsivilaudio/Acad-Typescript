namespace App {
    // Component base class
    export abstract class Component<
        T extends HTMLElement,
        K extends HTMLElement
    > {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: K;

        constructor(
            templateId: string,
            hostElementId: string,
            insertAtStart: boolean,
            newElementId?: string
        ) {
            this.templateElement = document.getElementById(
                templateId
            ) as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId) as T;

            const importedNode = document.importNode(
                this.templateElement.content,
                true
            );
            this.element = importedNode.firstElementChild as K;
            if (newElementId) {
                this.element.id = newElementId;
            }

            this.attach(insertAtStart);
        }

        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(
                insertAtBeginning ? 'afterbegin' : 'beforeend',
                this.element
            );
        }

        abstract configure(): void;
        abstract renderContent(): void;
    }
}
