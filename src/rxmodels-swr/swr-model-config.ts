export interface SwrModelConfig {
  serverUrl: string;
  loginUrl: string,
  tokenName: string,
  token: string,
}

export interface SwrModelConfigInput{
  serverUrl?: string;
  loginUrl?: string,
  tokenName?: string,
  token?: string,
}

export const swrModelConfig: SwrModelConfig = {
  serverUrl: 'http://localhost:3001/',
  loginUrl: '/login',
  tokenName: 'RxModelsToken',
  token: '',
}

export function initSwrModel(config:SwrModelConfigInput){
  for(const key in config){
    const value = (config as any)[key];
    if( value !== undefined){
      (swrModelConfig as any)[key] = value;
    }
  }

  return swrModelConfig;
}
