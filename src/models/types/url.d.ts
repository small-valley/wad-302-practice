export type Url = {
    id: number;
    user_id: string;
    longUrl: string;
    shortUrl: string;
    visit_count: number;
    unique_visit_count: number;
    created_at: Date;
    originating_ip_address: string[];
};
