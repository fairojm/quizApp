// tslint:disable-next-line: no-empty-interface
// tslint:disable-next-line: class-name
export interface questionModal {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<object>;
    all_answers?: Array<object>;
}
