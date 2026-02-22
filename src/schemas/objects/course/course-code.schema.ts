import { z } from 'zod';
import courseCodes from './course-codes.json';

export const CourseCodeSchema = z.enum(courseCodes);

export type CourseCode = z.infer<typeof CourseCodeSchema>;
