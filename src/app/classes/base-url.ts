export class URL {
    static readonly API_VERSION = 'v1';
    static readonly BASE_URL = 'http://localhost:8000';
    static readonly API_URL = this.BASE_URL + '/api/'+ this.API_VERSION;
    static readonly COMPAGNY_URL = this.API_URL + '/compagny';
    static readonly EMPLOYEE_URL = this.API_URL + '/employee';
}
