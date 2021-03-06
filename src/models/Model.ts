import { Attributes } from "./Attributes";
import { AxiosPromise, AxiosResponse, AxiosError } from "axios";

interface HasId {
  id?: number;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callBack: () => void): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then(
      (response: AxiosResponse): void => {
        this.set(response.data);
      }
    );
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }
}
