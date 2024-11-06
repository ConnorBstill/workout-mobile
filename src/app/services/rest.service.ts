import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JWTService } from './jwt.service';

import { RestResponse } from '../common/types/rest';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private readonly http: HttpClient, private readonly jwt: JWTService) {}

  /**
   * @description Abstracts generating an HTTP promise
   * @param {string} httpMethod
   * @param {string} url
   * @param {*} [body=null]
   * @returns {Promise<any>}
   */
  private generateHttpPromise(httpMethod: string, url: string, body = null): Promise<any> {
    let promise: Promise<any> = null;

    if (body) {
      promise = this.http[httpMethod](url, body, {
        headers: this.buildOptions(),
      })
        .toPromise()
        .catch((err) => this.handleError(err));
    } else {
      promise = this.http[httpMethod](url, {
        headers: this.buildOptions(),
      })
        .toPromise()
        .catch((err) => this.handleError(err));
    }

    return promise;
  }

  /**
   * Abstracts HTTP POST
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  post(url: string, body?: any): Promise<RestResponse> {
    return this.generateHttpPromise('post', url, body);
  }

  /**
   * Abstracts HTTP GET
   * @param  {string}       url
   * @return {Promise<any>}
   */
  get(url: string): Promise<RestResponse> {
    return this.generateHttpPromise('get', url);
  }

  /**
   * Abstracts HTTP DELETE
   * @param  {string}       url
   * @return {Promise<any>}
   */
  delete(url: string): Promise<RestResponse> {
    return this.generateHttpPromise('delete', url);
  }

  /**
   * Abstracts HTTP PUT
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  put(url: string, body?: any): Promise<RestResponse> {
    return this.generateHttpPromise('put', url, body);
  }

  /**
   * Abstracts HTTP PATCH
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  patch(url: string, body?: any): Promise<RestResponse> {
    return this.generateHttpPromise('patch', url, body);
  }

  /**
   * Lets use set build options with auth token header on abstracted HTTP calls
   * @return {RequestOptionsArgs}
   */
  private buildOptions(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.jwt.checkAuthToken(),
    });
  }

  /**
   * Error handling for all abstracted calls, doesn't reject a Promise
   * @param  {any}          serverError
   */
  private handleError(serverError: any): void {
    try {
      console.log('Caught try', serverError);
    } catch (e) {
      console.log('Caught catch', e);
    }
  }
}
