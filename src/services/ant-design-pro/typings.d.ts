// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type ProductListItem = {
    index?: number; // 排序
    isTop?: boolean; // 置顶
    img?: string; // 产品缩略图
    classification?: string; // 产品分类
    nameCn?: string; // 产品名称（中文）
    nameEn?: string; // 产品名称（英文）
    status?: '01' | '02'; // 产品状态 01:上架 02:下架
    createdAt?: string; // 创建时间
    updatedAt?: string; // 更新时间
    id: string; // 产品 ID
  };
  type ClassificationListItem = {
    index?: number; // 排序
    img?: string; // 分类缩略图
    nameCn?: string; // 分类名称（中文）
    nameEn?: string; // 分类名称（英文）
    createdAt?: string; // 创建时间
    updatedAt?: string; // 更新时间
    id: string; // 分类 ID
    pid?: string // 父类 ID
    level: number // 层级
    children?: ClassificationListItem[] // 子类
  }
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
