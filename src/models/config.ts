export interface IProject {
    version: string;
    name: string;
}

export interface IEnvironments {
    source: string;
    dev: string;
    prod: string;
}

export interface IApp {
    root: string;
    outDir?: string;
    assets?: string[];
    index?: string;
    main?: string;
    test?: string;
    tsconfig?: string;
    prefix: string;
    styles?: string[];
    scripts?: any[];
    environments?: IEnvironments;
}


export interface IProperties {
    flat?: boolean;
    spec?: boolean;
    inlineStyle?: boolean;
    inlineTemplate?: boolean;
    viewEncapsulation?: "Emulated" | "Native" | "None";
    changeDetection?: "Default" | "OnPush";
    prefix?: string;
}

export interface IDefaults {
    styleExt: string;
    class?: IProperties;
    component?: IProperties;
    directive?: IProperties;
    guard?: IProperties;
    interface?: IProperties;
    module?: IProperties;
    pipe?: IProperties;
    service?: IProperties;
}

export interface IConfig {
    project?: IProject;
    apps: IApp[];
    defaults: IDefaults;
}



