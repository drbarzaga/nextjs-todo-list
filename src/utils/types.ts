export interface ResponseFunctions {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

export interface Todo {
    _id?: number
    item: string
    completed: boolean
}

export type HomePageProps = {
    todos: Todo[]
}

export type TodoDetailsPageProps = {
    todo: Todo,
    url: string
}