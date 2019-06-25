import { XmlComponent } from "file/xml-components";

import { HeaderReferenceType } from "./document";
import { IDrawingOptions } from "./drawing";
import { Header } from "./header/header";
import { Image, Media } from "./media";
import { Paragraph } from "./paragraph";
import { Relationships } from "./relationships";
import { Table } from "./table";

export interface IDocumentHeader {
    readonly header: HeaderWrapper;
    readonly type: HeaderReferenceType;
}

export class HeaderWrapper {
    private readonly header: Header;
    private readonly relationships: Relationships;

    constructor(private readonly media: Media, referenceId: number, initContent?: XmlComponent) {
        this.header = new Header(referenceId, initContent);
        this.relationships = new Relationships();
    }

    public add(item: Paragraph | Table): HeaderWrapper {
        this.header.addChildElement(item);

        return this;
    }

    public addImage(image: Image): HeaderWrapper {
        this.header.add(image.Paragraph);
        return this;
    }

    public addChildElement(childElement: XmlComponent | string): void {
        this.header.addChildElement(childElement);
    }

    public createImage(
        buffer: Buffer | string | Uint8Array | ArrayBuffer,
        width?: number,
        height?: number,
        drawingOptions?: IDrawingOptions,
    ): Paragraph {
        const image = Media.addImage(this, buffer, width, height, drawingOptions);
        const paragraph = new Paragraph(image);
        this.add(paragraph);

        return paragraph;
    }

    public get Header(): Header {
        return this.header;
    }

    public get Relationships(): Relationships {
        return this.relationships;
    }

    public get Media(): Media {
        return this.media;
    }
}
