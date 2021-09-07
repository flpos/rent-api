export interface BaseUseCase<P, R> {
  execute(payload: P): Promise<R | null>;
}
