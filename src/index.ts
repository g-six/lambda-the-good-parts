type ILambdaEvent = {}
export const userApi = async (event: ILambdaEvent = {}): Promise<any> => {
    const response: string = JSON.stringify(event, null, 2)
    return response
}
