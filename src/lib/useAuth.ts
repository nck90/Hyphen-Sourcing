import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAuth() {
    const { data, error, mutate, isLoading } = useSWR("/api/auth/me", fetcher);

    return {
        user: data?.user,
        isAuthenticated: data?.authenticated === true,
        isLoading,
        isError: error,
        mutate,
    };
}
