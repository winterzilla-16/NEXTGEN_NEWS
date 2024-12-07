from django.shortcuts import render
from django.http import *
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from v1.models import *

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


def decode_token(token):
    try:
        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)

        return user
    except (InvalidToken, TokenError) as e:
        return None, None

class AddNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        require_post = ['title', 'content', 'thumbnail', 'tags']
        checkexistpost = [post for post in require_post if post not in request.data]

        if checkexistpost:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content,status=status.HTTP_400_BAD_REQUEST)

        jwt_token = request.META.get('HTTP_AUTHORIZATION', None)

        if jwt_token and jwt_token.startswith('Bearer '):
            token = jwt_token.split(' ')[1]
            user = decode_token(token)

            try:

                if user:
                    checkuser = User.objects.get(username=user.username)
                    if checkuser.is_staff == 1:
                        post = request.data
                        insert = news.objects.create(title=post['title'], content=post['content'],
                                                     thumbnail=post['thumbnail'], tags=post['tags'], author=checkuser)
                        insert.save()
                        if insert:
                            content = {
                                'status': 'success',
                                'message': 'เพิ่มข่าวเข้าระบบเรียบร้อยแล้ว',
                            }
                            return Response(content, status=status.HTTP_200_OK)
                        else:
                            content = {
                                'status': 'error',
                                'message': 'ไม่สามารถเพิ่มข่าวได้',
                            }
                            return Response(content,status=status.HTTP_400_BAD_REQUEST)
                    else:
                        content = {
                            'status': 'error',
                            'message': 'คุณไม่ใช่นักข่าว',
                        }
                        return Response(content,status=status.HTTP_400_BAD_REQUEST)

                else:
                    content = {
                        'status': 'error',
                        'message': 'Token ไม่ถูกต้อง',
                    }
                    return Response(content,status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:
                return Response({'status': 'error', 'message': 'ไม่พบ User'}, status=404)

        content = {'status': 'error', 'message': 'Invalid or missing token'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

class EditNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        require_post = ['title', 'content', 'thumbnail', 'tags', 'id_news']
        checkexistpost = [post for post in require_post if post not in request.data]

        if checkexistpost:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content,status=status.HTTP_400_BAD_REQUEST)

        jwt_token = request.META.get('HTTP_AUTHORIZATION', None)

        if jwt_token and jwt_token.startswith('Bearer '):
            token = jwt_token.split(' ')[1]
            user = decode_token(token)

            try:

                if user:
                    checkuser = User.objects.get(username=user.username)
                    if checkuser.is_staff == 1:

                        post = request.data
                        checknews = news.objects.get(id=post['id_news'], author=checkuser)

                        if checknews:
                            checknews.title = post['title']
                            checknews.content = post['content']
                            checknews.thumbnail = post['thumbnail']
                            checknews.tags = post['tags']
                            checknews.save()

                            content = {
                                'status': 'success',
                                'message': 'เแก้ไข่าวเข้าระบบเรียบร้อยแล้ว',
                            }
                            return Response(content, status=status.HTTP_200_OK)
                        else:
                            content = {
                                'status': 'error',
                                'message': 'ไม่พบข่าวหรือคุณไม่มีสิทธิ์ในการแก้ไข',
                            }
                            return Response(content,status=status.HTTP_400_BAD_REQUEST)
                    else:
                        content = {
                            'status': 'error',
                            'message': 'คุณไม่ใช่นักข่าว',
                        }
                        return Response(content,status=status.HTTP_400_BAD_REQUEST)

                else:
                    content = {
                        'status': 'error',
                        'message': 'Token ไม่ถูกต้อง',
                    }
                    return Response(content,status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบ User'}, status=404)

            except news.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

        content = {'status': 'error', 'message': 'Invalid or missing token'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

class DeleteNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        require_post = ['id_news']
        checkexistpost = [post for post in require_post if post not in request.data]

        if checkexistpost:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content,status=status.HTTP_400_BAD_REQUEST)

        jwt_token = request.META.get('HTTP_AUTHORIZATION', None)

        if jwt_token and jwt_token.startswith('Bearer '):
            token = jwt_token.split(' ')[1]
            user = decode_token(token)

            try:

                if user:
                    checkuser = User.objects.get(username=user.username)
                    if checkuser.is_staff == 1:

                        post = request.data
                        checknews = news.objects.get(id=post['id_news'], author=checkuser)

                        if checknews:
                            checknews.delete()
                            content = {
                                'status': 'success',
                                'message': 'ลบข่าวเรียบร้อยแล้ว',
                            }
                            return Response(content, status=status.HTTP_200_OK)
                        else:
                            content = {
                                'status': 'error',
                                'message': 'ไม่พบข่าวหรือคุณไม่มีสิทธิ์ในการลบ',
                            }
                            return Response(content,status=status.HTTP_400_BAD_REQUEST)
                    else:
                        content = {
                            'status': 'error',
                            'message': 'คุณไม่ใช่นักข่าว',
                        }
                        return Response(content,status=status.HTTP_400_BAD_REQUEST)

                else:
                    content = {
                        'status': 'error',
                        'message': 'Token ไม่ถูกต้อง',
                    }
                    return Response(content,status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบ User'}, status=404)

            except news.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

        content = {'status': 'error', 'message': 'Invalid or missing token'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

class CommentNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        require_post = ['id_news', 'text']
        checkexistpost = [post for post in require_post if post not in request.data]

        if checkexistpost:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content,status=status.HTTP_400_BAD_REQUEST)

        jwt_token = request.META.get('HTTP_AUTHORIZATION', None)

        if jwt_token and jwt_token.startswith('Bearer '):
            token = jwt_token.split(' ')[1]
            user = decode_token(token)

            try:

                if user:
                    checkuser = User.objects.get(username=user.username)
                    if checkuser:

                        post = request.data
                        checknews = news.objects.get(id=post['id_news'])

                        if checknews:

                            comment = comments.objects.create(author=checkuser, comment=post['text'], news=checknews)
                            comment.save()
                            content = {
                                'status': 'success',
                                'message': 'เพิ่มความคิดเห็นแล้ว',
                            }
                            return Response(content, status=status.HTTP_200_OK)
                        else:
                            content = {
                                'status': 'error',
                                'message': 'ไม่พบข่าว',
                            }
                            return Response(content,status=status.HTTP_400_BAD_REQUEST)
                    else:
                        content = {
                            'status': 'error',
                            'message': 'คุณไม่สามารถแสดงความคิดเห็นได้',
                        }
                        return Response(content,status=status.HTTP_400_BAD_REQUEST)

                else:
                    content = {
                        'status': 'error',
                        'message': 'Token ไม่ถูกต้อง',
                    }
                    return Response(content,status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบ User'}, status=404)

            except news.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

        content = {'status': 'error', 'message': 'Invalid or missing token'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

class GetNewsByIDView(APIView):
    def get(self, request, **kwargs):

        id_news = self.kwargs['pk']

        try:

            newsdetail = news.objects.get(pk=id_news)
            if newsdetail:

                author = User.objects.get(id=newsdetail.author.id)

                if author:
                    author_detail = {
                        'first_name': author.first_name,
                        'last_name': author.last_name,
                    }

                    content = {
                        'id': newsdetail.id,
                        'titile': newsdetail.title,
                        'thumbnail': newsdetail.thumbnail,
                        'author': author_detail,
                        'content': newsdetail.content,
                        'tags': newsdetail.tags,
                    }
                    return Response(content, status=status.HTTP_200_OK)
                else:
                    content = {
                        'status': 'error',
                        'message': 'ไม่พบนักข่าว',
                    }
                    return Response(content, status=status.HTTP_400_BAD_REQUEST)
            else:
                content = {
                    'status': 'error',
                    'message': 'ไม่พบข่าว',
                }
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except news.DoesNotExist:
            return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

class SearchNewsView(APIView):
    def post(self, request):

        require_post = ['text']
        checkexistpost = [post for post in require_post if post not in request.data]
        if checkexistpost:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


        if request.data['text']:
            post = request.data

            try:

                search = news.objects.filter(title__icontains=post['text'])[:10]
                news_list = []
                for i in search:
                    detail = {
                        'id': i.id,
                        'title': i.title,
                        'thumbnail': i.thumbnail,
                        'content': i.content,
                        'tags': i.tags,
                    }
                    news_list.append(detail)

                content = {
                    'status': 'success',
                    'data': news_list,
                }
                return Response(content, status=status.HTTP_200_OK)


            except news.DoesNotExist:
                return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

        else:
            content = {
                'status': 'error',
                'message': 'คุณกรอกข้อมูลไม่ครบ',
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

class HotNewsViews(APIView):
    def get(self, request, **kwargs):
        try:
            newsdetail = news.objects.all().order_by('?')[:4]

            newsresult = []
            if newsdetail:
                for i in newsdetail:
                    content = {
                        'id': i.id,
                        'titile': i.title,
                        'thumbnail': i.thumbnail,
                        'content': i.content,
                        'tags': i.tags,
                    }
                    newsresult.append(content)
                return Response(newsresult, status=status.HTTP_200_OK)

            else:
                content = {
                    'status': 'error',
                    'message': 'ไม่พบข่าว',
                }
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

        except news.DoesNotExist:
            return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

class MyNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        jwt_token = request.META.get('HTTP_AUTHORIZATION', None)

        if jwt_token and jwt_token.startswith('Bearer '):
            token = jwt_token.split(' ')[1]
            user = decode_token(token)

            try:

                if user:
                    checkuser = User.objects.get(username=user.username, is_staff=True)
                    if checkuser:

                        checknews = news.objects.filter(author=checkuser).order_by('-id')

                        newslist = []
                        if checknews:
                            for i in checknews:
                                content = {
                                    'id': i.id,
                                    'titile': i.title,
                                    'thumbnail': i.thumbnail,
                                    'content': i.content,
                                    'tags': i.tags,
                                }
                                newslist.append(content)
                            return Response(newslist, status=status.HTTP_200_OK)
                        else:
                            content = {
                                'status': 'success',
                                'message': 'ไม่พบข่าวที่คุณสร้าง',
                            }
                            return Response(content,status=status.HTTP_400_BAD_REQUEST)
                    else:
                        content = {
                            'status': 'error',
                            'message': 'คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้',
                        }
                        return Response(content,status=status.HTTP_400_BAD_REQUEST)

                else:
                    content = {
                        'status': 'error',
                        'message': 'Token ไม่ถูกต้อง',
                    }
                    return Response(content,status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบ User'}, status=404)

            except news.DoesNotExist:

                return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

        content = {'status': 'error', 'message': 'Invalid or missing token'}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

class CourtSideView(APIView):
    def get(self, request, **kwargs):
        try:
            newsdetail = news.objects.all()

            newsresult = []
            if newsdetail:
                for i in newsdetail:
                    content = {
                        'id': i.id,
                        'titile': i.title,
                        'thumbnail': i.thumbnail,
                        'content': i.content,
                        'tags': i.tags,
                    }
                    newsresult.append(content)
                return Response(newsresult, status=status.HTTP_200_OK)

            else:
                content = {
                    'status': 'error',
                    'message': 'ไม่พบข่าว',
                }
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

        except news.DoesNotExist:
            return Response({'status': 'error', 'message': 'ไม่พบข่าว'}, status=404)

def welcome(req):
    return HttpResponse('API Current Version v1')