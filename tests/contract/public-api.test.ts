import { describe, expect, it } from 'bun:test';

import * as publicApi from '@/index';

const expectedRuntimeExports = [
  'AcademicPeriodSchema',
  'AcademicRankSchema',
  'AcademicSupportPositionSchema',
  'AcademicSupportStaffSchema',
  'AcademicTeachingStaffSchema',
  'AcademicUsernameSchema',
  'AcademicYearSchema',
  'AlumniBatchListSchema',
  'AlumniBatchSchema',
  'ConferenceSchema',
  'CourseCodeSchema',
  'CourseIdSchema',
  'CourseOfferingIdSchema',
  'CourseOfferingSchema',
  'CourseSchema',
  'CourseStaffSchema',
  'HonoursStreamSchema',
  'KnownSocialIcons',
  'KnownSocialPlatforms',
  'NonAcademicPositionSchema',
  'NonAcademicStaffSchema',
  'PeopleSearchEntrySchema',
  'PeopleSearchEntryTypeSchema',
  'PeopleSearchIndexSchema',
  'PersonSchema',
  'PostgraduateProgrammeDefinitionListSchema',
  'PostgraduateProgrammeDefinitionSchema',
  'PostgraduateProgrammeSchema',
  'ProgramSchema',
  'ProjectCourseOfferingSchema',
  'ProjectCourseSchema',
  'ProjectDatesSchema',
  'ProjectLinksSchema',
  'ProjectMediaSchema',
  'ProjectPersonRoleSchema',
  'ProjectPersonSchema',
  'ProjectSchema',
  'ProjectSourceSchema',
  'ProjectStatusSchema',
  'ProjectTypeSchema',
  'PublicationSchema',
  'ResearchSchema',
  'SNumberSchema',
  'SlqfLevelSchema',
  'SocialIconSchema',
  'SocialLinksSchema',
  'StaffSchema',
  'StudentLevelSchema',
  'StudentPlacementListSchema',
  'StudentPlacementSchema',
  'StudentSchema',
  'StudentStatusSchema',
  'StudentStreamDefinitionListSchema',
  'StudentStreamDefinitionSchema',
  'StudentStreamSchema',
  'StudentTrackSchema',
  'StudentTypeSchema',
  'detectKnownSocialUrl',
  'normalizeKnownSocialUrl',
] as const satisfies readonly (keyof typeof publicApi)[];

describe('package public API', () => {
  for (const exportName of expectedRuntimeExports) {
    it(`exports ${exportName}`, () => {
      expect(publicApi[exportName]).toBeDefined();
    });
  }

  it('does not expose an unexpected runtime contract', () => {
    expect(Object.keys(publicApi).sort()).toEqual(
      [...expectedRuntimeExports].sort()
    );
  });
});
