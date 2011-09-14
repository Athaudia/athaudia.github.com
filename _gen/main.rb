require 'markaby'
require 'time'

Markaby::Builder.set(:indent, 2)

$path =
{
'index' => {name: 'News'},
'pages/cutespacegame' => {name: 'Cute Space Game', childs:{
	'pages/cutespacegame' => 'About',
	'pages/csg_screenshots' => 'Screenshots',
	'pages/csg_downloads' => 'Download'
	}}
}

class Hash
	def json
		self.map {|k, v| "#{k.to_s}: #{v.inspect}"}.join(", ")
	end
end

def ph(text, token)
	while i = text.index(token)
		s = text.index(token, i+1)
		text[i,s-i+token.size] = yield(text[i+token.size,s-i-token.size])
	end
	text
end

def parse(text)
	text = ph(text, '[IMG]') {|img| "<a href=\"/imgs/#{img}.png\" rel=\"lighterbox\"><img src=\"/imgs/#{img}-t.png\" /></a>"}
	text = ph(text, '[A]') {|l| url, label = l.split(';'); "<a href=\"#{url}\">#{label}</a>"}
	text = ph(text, '[AI]') {|l| url, label = l.split(';'); "<a href=\"/#{url}\">#{label}</a>"}
	text.each_line.map{|l| "<p>#{l}</p>"}.join("\n")
end

def loadpost(filename)
	tag, title, text = File.read(filename).split("\n",3)
	tag = eval("{#{tag}}")
	ot = tag.clone
	tag[:date] = (tag[:date] or Time.now.to_s)
	if ot != tag then File.open(filename, 'w') {|f| f.write "#{tag.json}\n#{title}\n#{text}"}	end
	tag[:title] = title
	tag[:text] = text
	tag[:id] = filename[6,4]
	tag
end

def loadpage(filename)
	tag, title, text = File.read(filename).split("\n",3)
	tag = {}
	tag[:title] = title
	tag[:text] = text
	tag
end

$pages = {}
Dir['pages/*'].each{|f| $pages[f[6,f.size-6-4]] = loadpage(f)}
puts $pages.inspect


$posts = Dir['posts/*'].sort.map{|f| loadpost(f)}

def post(post)
	Markaby::Builder.new.p do
		a(href: "/posts/#{post[:id]}.html") {h2 post[:title]}
		self << parse(post[:text])
		div.timestamp post[:date]
	end.to_s
end

def page(page)
	Markaby::Builder.new.p do
		h2 page[:title]
		self << parse(page[:text])
	end.to_s
end

def template(options = {})
	options[:scripts] = (options[:scripts] or [])
	options[:scripts] << Markaby::Builder.new.script(src: '/lighterbox.js'){}.to_s
	Markaby::Builder.new.html do
		head do
			link rel: 'stylesheet', type: 'text/css', href: '/style.css'
			link rel: 'stylesheet', type: 'text/css', href: '/lighterbox.css'
			link rel: 'stylesheet', type: 'text/css', href: 'http://fonts.googleapis.com/css?family=Voltaire'
			title 'Athaudia'
		end
		body do
			div.main do
				div.header do
					h1 'Athaudia'
					div.nav do
						$path.map{|k,v| a(href: "/#{k}.html"){v[:name]}.to_s}.join(' | ')
					end
					pn = options[:pagename]
					if pn
						$path.each{|k,v| if v[:childs] and v[:childs].keys.include?(options[:pagename]) then pn = k end}
						if $path[pn][:childs]
							div.subnav do
								$path[pn][:childs].map{|k,v| a(href: "/#{k}.html"){v}.to_s}.join(' | ')
							end
						end
					end
				end
				self << options[:sidebar]
				self << options[:content]
			end
			self << (options[:scripts] or []).join("\n")
		end
	end.to_s
end

def twitter(options = {})
	options[:sidebar] = Markaby::Builder.new
	options[:sidebar].div.sidebar.tweets! do
		h1.sidebarTitle 'Tweets:'
	end
	options[:sidebar] = options[:sidebar].to_s
	options[:scripts] = (options[:scripts] or []) + [
	Markaby::Builder.new.script(src: 'http://twitterjs.googlecode.com/files/twitter-1.13.1.min.js'){}.to_s,
	Markaby::Builder.new.script(type: 'text/javascript') do
		"""window.onload = function()
		{
			getTwitters('tweets',{id:'athaudia', count: 4, ignoreReplies: true, clearContents: false});
		};
		"""
	end.to_s
	]
	options
end

$files = {}
$files['index.html'] = twitter(content: $posts.reverse.map{|p| post(p)}.join)
$posts.each{|p| $files["posts/#{p[:id]}.html"] = {content: post(p)}}
$pages.each{|n,p| $files["pages/#{n}.html"] = {content: page(p), pagename: 'pages/'+n}}
$files.each{|fname,c| File.open('../'+fname,'w') {|f| f.write "<!DOCTYPE html>\n" + template(c)}}