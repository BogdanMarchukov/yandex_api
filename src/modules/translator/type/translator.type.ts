export interface IamToken {
  iamToken: string;
  expiresAt: string;
}

export interface Translation {
  text: string;
  detectedLanguageCode: string;
}

export interface DetectLanguageBody {
  text: string;
  folderId: string;
}

export interface DetectLanguageResult {
  languageCode: string;
}

export interface TranslateBody {
  texts: string[];
  targetLanguageCode: string;
  folderId: string;
}

export interface TranslateResult {
  text: string;
  detectedLanguageCode: string;
}
