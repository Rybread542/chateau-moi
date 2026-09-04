

interface accessData {
    userID: string;
    displayName: string;
}


const userByCode: Map<string, accessData> = new Map(
    (process.env.ST_ACCESS ?? "")
    .split("|")
    .filter(Boolean)
    .map((entry) => {
        const [ code, userID, displayName ] = entry.split(":")
        return [
            code, { userID, displayName }
        ] as const
    })
)

export function getUserByCode(submitted: string) : accessData | null {
    for (const [ code, user ] of userByCode) {
        if (code === submitted) return user
    }
    return null
}