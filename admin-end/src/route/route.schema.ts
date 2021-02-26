// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import { Route as RouteInterface } from '../route.interface';
export type RouteDocument = RouteInterface & Document
@Schema({})
export class Route {

}
