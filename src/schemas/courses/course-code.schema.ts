import { z } from 'zod';

import courseCodes from './course-codes.json' with { type: 'json' };

export const CourseCodeSchema = z.enum(courseCodes);

export type CourseCode = z.infer<typeof CourseCodeSchema>;
