export interface ExternalProgramInterface {
id: any,
key: string,
stations: []
}

export interface ExternalPriceCategory{
    id: any,
    key: string,
    name: string,
    priceConfigs: []
}

export interface ExternalPriceConfig{
    id: any,
}
export interface ExternalStation {
    id: any,
    key: string,
    name: string,
}