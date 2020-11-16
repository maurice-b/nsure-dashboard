import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor() {
    super();
  }

  // tslint:disable-next-line:no-any
  public handleError(error: HttpErrorResponse | TypeError | Error | any): void {
    let message: string;
    let errorData: string[];

    if (error instanceof HttpErrorResponse) {
      message = 'There was an HTTP error.';
      errorData = [
        error.message,
        `Status code: ${(error as HttpErrorResponse).status}`
      ];
    } else if (error instanceof TypeError) {
      message = 'There was a Type error.';
      errorData = [
        error.message,
        error.stack || ''
      ];
    } else if (error instanceof Error) {
      message = 'There was a general error.';
      errorData = [
        error.message,
        error.stack || ''
      ];
    } else {
      message = 'Nobody threw an Error but something happened!';
      errorData = [
        error.message,
        error.stack
      ];
    }

    console.error(message, errorData);

    // TODO: Implement toaster
    // this.loggingService.error(message, errorData);
    //
    // this.interactionService.notify(
    //   new ErrorMessage().setText(error.message)
    // );

    return super.handleError(error);
  }
}
