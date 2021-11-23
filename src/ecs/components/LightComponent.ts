import { ComponentInterface } from "./ComponentInterface";

export class LightComponent implements ComponentInterface {
    public static TYPE: string = "LightComponent";

    get type(): string {
        return LightComponent.TYPE;
    }
}
