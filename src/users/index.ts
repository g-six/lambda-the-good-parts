type ILambdaEvent = {}
export const userApi = async (event: ILambdaEvent = {}): Promise<any> => {
    const body: string = JSON.stringify(event, null, 2)
    return {
        statusCode: 200,
        body,
    }
}
