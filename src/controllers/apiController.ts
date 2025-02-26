import { Request, Response } from 'express';
import supabase from '../utils/SupabaseConnect.js';
import { Database, Tables } from '@/types/supabase';
import Mock from "mockjs";
import {generateMockTemplate} from "@/utils/MockMethod";

export const getTableData = async (req: Request, res: Response) => {
    const table = req.params.table as keyof Database['public']['Tables'];
    const id = req.params.id;
    const params = req.query;

    type resDataType = Tables<typeof table>;

    let type;
    try {
        const {data, error} = await supabase.from(table).select().eq('id', id);

        if (error) {
            res.status(500).json({error: error.message});
        } else {
            let resData = data as resDataType[];
            if (table === 'Model') {
                const modelData = resData as Tables<'Model'>[];
                let template = generateMockTemplate(modelData[0]?.fields);
                console.log(template)
                res.json(Mock.mock(template));
            } else {
                res.json(resData);
            }
        }
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
};
