import { ReactNode } from "react"

export interface UserInterface {
    [x: string]: ReactNode;
    id: number;
    name: string;
    email: string;
}


interface Data {
    id: string | number
    name?: string
    status: boolean | number | string
}
export interface CollectionItems {
    current_page: number
    data: Data[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number,
    model_name: string,
    model_name_plural: string,
    fillable: {},
    sortable: [],
}

export interface Link {
    url?: string
    label: string
    active: boolean
}

export interface GameInterface {
    id: string
    date_time: string
    date: string
    time: string
    has_time: number
    home_team_id: string
    away_team_id: string
    ht_results: string
    ft_results: string
    competition_abbreviation: string
    competition_id: string
    update_status: number
    update_failed_attempts: number
    url: string
    stadium_id: string
    temperature: string
    weather_condition_id: string
    user_id: string
    status: number
    created_at: string
    updated_at: string
    home_team: string
    away_team: string
}

export interface TeamInterface {
    id: string;
    name: string;
    slug: string;
    games: GameInterface[]
}

export interface GetItem {
    data: Data
    model_name: string,
    model_name_plural: string,
    fillable: {},
    sortable: [],
}

export interface GetItems {
    [index: number]: GetItem[];
}

export interface ResponseData {
    type: string;
    message: string;
    data: any;
}

interface ColumnInterface {
    label: string,
    key: string,
    column?: string,
}

interface ActionInterface {
    label: string;
    mode: 'buttons' | 'dropdown' | undefined;
    view?: 'modal' | 'page' | undefined;
    edit?: 'modal' | 'page' | undefined;
    delete?: boolean;
}

export interface AutoTableInterface {
    baseUri: string;
    listUri?: string;
    singleUri?: string;
    search?: boolean;
    columns: ColumnInterface[];
    action: ActionInterface;
    setEditingRow?: ((id: string) => void) | null | undefined;
    setIsModalOpen?: ((val: boolean) => void) | undefined;
    handleView?: (val: object) => void; // Define the handleView function type
    handleEdit?: (val: object) => void; // Define the handleEdit function type
    handleDelete?: (val: object) => void; // Define the handleDelete function type
    reload?: number;
    hideCreate?: boolean
}


export interface Route {
    uri: string;
    uri_methods: string;
    slug: string;
    title: string;
    folder: string;
    hidden: boolean;
    children?: {
        routes: Route[];
        children?: {
            [key: string]: {
                routes: Route[];
                children?: {
                    routes: Route[];
                    children?: {
                        [key: string]: {
                            routes: Route[];
                            children?: {
                                routes: Route[];
                            };
                        };
                    };
                };
            };
        };
    };
}