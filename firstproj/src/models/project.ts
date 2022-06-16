namespace App {
    // Project class
    export enum ProjectStatus {
        Active,
        Finished,
    }

    export class Project {
        constructor(
            public id: string,
            public title: string,
            public type: string,
            public people: number,
            public description: string,
            public status: ProjectStatus
        ) {}
    }
}
