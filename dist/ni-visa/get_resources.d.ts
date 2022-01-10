export { viClose } from './vi_close';
export { viOpen } from './vi_open';
export { viOpenDefaultRM } from './vi_open_default_r_m';
export { viRead } from './vi_read';
export { viWrite } from './vi_write';
export declare type ResourceList = {
    resourceName: string;
    present: boolean;
};
export declare const getResources: () => Promise<ResourceList[]>;
